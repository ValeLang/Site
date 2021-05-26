const functions = require("firebase-functions");
const fs = require('fs');
//var AdmZip = require('adm-zip');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

class RaySig {
  name: string = "";
  git: string = "";
  constructor(name: string, git: string){
    this.name = name;
    this.git = git;
  }
}

class Version {
  git: string = "";
  hash: string = "";
  version: string ="0.1.0";
  constructor(git: string, hash: string, version: string) {
    this.git = git;
    this.hash = hash;
    this.version = version;
  }
}

class RayUpload {
  name: string = "";
  version: Version = new Version("", "", "");
  vale_version: string = "";
  constructor(obj: any) {
    this.vale_version = "";
    //console.log("value: " + json); 
    //let obj = JSON.parse(json);
    if(obj.name == null){
      throw new Error("missing name for the ray");
    }
    if(obj.version == null) {
      throw new Error("missing version number for the ray");
    }
    if(obj.vale_version == null) {
      throw new Error("missing vale version");
    }
    this.name = obj.name;
    this.version = obj.version;
    this.vale_version = obj.vale_version;
  }
  getname(): string { return this.name }
  getpath(): string {
    return "../public/" + this.vale_version + "/" + this.name + "/"; 
  }
  getgit(): string { return this.version.git; }
  getversion(): string {return this.version.version; }
}

class Ray {
  sig: RaySig;
  versions: Version[];
  path: string;
  constructor(path: string, name: string, git: string) {
    this.versions = new Array(); 
    let exists: boolean = fs.existsSync(path + "versions.json"); 
    if(exists){
      console.log("path: " + path + "versions.json"); 
      let data = fs.readFileSync(path + "versions.json", "utf8");
      console.log("data: " + data);
      this.versions = JSON.parse(data); 
    }else{
        this.versions = new Array();
    }
    this.sig = new RaySig(name, git);
    this.path = path;
  }
  has_version(version: Version): boolean {
    let retval = false;
    this.versions.forEach(value => {
      if(value.version == version.version){
        retval = true;
      }
    });
    return retval;
  }
  create_version(version: Version): string {
    this.versions.push(version);
    return JSON.stringify(this.versions);
  }
}

class Index {
  ray: RaySig[] = new Array();
}

exports.createray = functions.https.onRequest((request, response) => { 
   let upload = new RayUpload(request.body);
   console.log("upload: " + upload);
   if(!fs.existsSync(upload.getpath())) {
    console.log("path: " + upload.getpath()); 
    if(!fs.existsSync("../public/" + upload.vale_version)){ 
    fs.mkdirSync("../public/" + upload.vale_version, function(err){
      response.status(501).send(err);
    });
    }
    if(!fs.existsSync("../public/" + upload.vale_version + "/" + upload.name)){
      fs.mkdirSync("../public/" + upload.vale_version + "/" + upload.name, function(err) { response.status(500).send(err); });
    }
    //fs.mkdirSync(upload.getpath(), function(err) { response.status(500).send(err); });
  }
  let ray = new Ray(upload.getpath(), upload.getname(), upload.getgit());
  let has_version = ray.has_version(upload.version);  
  if(has_version){
    response.status(200).send("version already exists");
  }else{
  fs.writeFileSync(upload.getpath() + "versions.json", ray.create_version(upload.version), err => {
    response.status(501).send(err);
  });
  }
  let data = fs.readFileSync("../public/index.json", 'utf8');
    let signatures: Index = JSON.parse(data);
    let contains: boolean = false;
    signatures.ray.forEach(element => {
      if(element.git == ray.sig.git && element.name == ray.sig.name){
        contains = true;
      }
    });
    if(contains && !has_version) {
      response.status(200).send("ray already exists");
    }else{
      signatures.ray.push(ray.sig);
      fs.writeFileSync("../public/index.json", JSON.stringify(signatures), err => { response.status(501).send(err) });
      response.status(200).send("uploaded version"); 
    }
  //response.send("unreachable code reached");
});
