import unittest
import subprocess
import os.path
import os
import sys
import shutil
import glob
import re

from typing import Dict, Any, List, Callable


def procrun(args: List[str], input, **kwargs) -> subprocess.CompletedProcess:
    # process = subprocess.Popen(args, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, **kwargs)
    # process.stdin.write(input)
    # process_output = child_proccess.communicate()[0]
    # proccess.stdin.close()
    # return process_output
    return subprocess.run(args, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, input=input, text=True)

def highlight(valestrom_filepath, text):
    driver_class = "net.verdagon.vale.driver.Driver"
    process = procrun(
        [
            "java",
            "-cp",
            valestrom_filepath,
            driver_class,
            "highlight",
            "stdin:",
            "-oh",
            "stdout:"
        ],
        text)
    return process.stdout


def main():
    if len(sys.argv) < 4:
        print("Usage example: python3 blogify.py ../Vale/Valestrom/out/artifacts/Driver_jar/Driver.jar app/blog/ZeroCostRefs.vbl app/blog/ZeroCostRefs.jsx")
        return

    valestrom_filepath = sys.argv[1]
    vbl_file = sys.argv[2]

    with open(vbl_file, 'r') as file:
        contents = file.read()

    contents = (
        re.sub(
            r'<imports />',
"""
import React from 'react';
import ReactDOM from 'react-dom';
import BlogHeader from './BlogHeader.jsx';
import Footer from '../components/Footer.jsx';
import {NoteManager, Note, NoteAnchor, NotesHeader} from '../components/Note.jsx';
import '../components/Tripage.css';
import '../common.css'
import './Blog.css'
import Snippet from '../components/Snippet.jsx';
import claspsvg from './clasp.svg';
""",
            contents))

    pageMatch = re.search(r'<page ns="([^"]+)" path="([^"]+)">', contents)
    assert(pageMatch != None)
    ns = pageMatch.group(1)
    page_path = pageMatch.group(2)
    
    pageJSX = (
"""
const ns = (classes) => "c-blog m-tripage " + (classes || "");

function incode(code, suffix) {
  if (suffix) {
    return <span><span className={ns("inline-code")} style={{paddingRight: 0}}>{code}</span>{suffix}</span>
  } else {
    return <span className={ns("inline-code")}>{code}</span>
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.noteManager = new NoteManager(this);

    this.updateNoteAnchorPosition = (...args) => this.noteManager.updateNoteAnchorPosition(...args);
    this.updateNoteSizeAndCustomIcon = (...args) => this.noteManager.updateNoteSizeAndCustomIcon(...args);
    this.updateNotesHeaderRect = (...args) => this.noteManager.updateNotesHeaderRect(...args);
  }

  componentDidUpdate(prevProps, prevState) {
    this.noteManager.componentDidUpdate();
  }

  componentDidMount() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }

  noteAnchor(anchorName) {
    return <NoteAnchor iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteAnchorPosition} name={anchorName}/>;
  }


  render() {
    return (
      <div className={ns("root")}>
        <BlogHeader small={true} />

        <div className={ns("page")}>
          <div className={ns("columns")}>
""")
    contents = contents[:pageMatch.start()] + pageJSX + contents[pageMatch.end():]

    contents = (
        re.sub(
            r'</page>',
"""
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('main')
);
""",
            contents))


    contents = (
        re.sub(
            r'<main>',
"""
  <div className={ns("left")}>
    <div className={ns("main")}>
""",
            contents))
    contents = (
        re.sub(
            r'</main>',
"""
    </div>
  </div>
""",
            contents))




    title_match = re.search(r'<title>([^<]+)</title>', contents)
    assert(title_match != None)
    title = title_match.group(1)
    replacement = '<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>' + title + '</h1>'        
    contents = contents[:title_match.start()] + replacement + contents[title_match.end():]



    contents = (
        re.sub(
            r'<title>([^<]+)</title>',
            '<h1 className={ns("noline cozy")} style={{marginTop: "8px"}}>\\1</h1>',
            contents))
    contents = (
        re.sub(
            r'<subtitle>([^<]+)</subtitle>',
            '<div className={ns("subtitle content cozy")}>\\1</div>',
            contents))


    contents = (
        re.sub(
            r'<date-and-author date="([^"]+)" author="([^"]+)" ?/>',
            '<div className={ns("content")} style={{marginBottom: "32px"}}><span className={ns("date")}>\\1</span> <span className={ns("author")}>&nbsp;&mdash;&nbsp; \\2</span></div>',
            contents))


    contents = (
        re.sub(
            r'<section>',
            '<div className={ns("section")}>',
            contents))
    contents = (
        re.sub(
            r'</section>',
            '</div>',
            contents))


    contents = (
        re.sub(
            r'<p>',
            '<div className={ns("content cozy")}>',
            contents))
    contents = (
        re.sub(
            r'</p>',
            '</div>',
            contents))


    contents = (
        re.sub(
            r'<n>([^<]+)</n>',
            '{this.noteAnchor("\\1")}',
            contents))
  


    contents = (
        re.sub(
            r'<split>',
            '<div className={ns("content splitter")}>',
            contents))
    contents = (
        re.sub(
            r'</split>',
            '</div>',
            contents))



    contents = (
        re.sub(
            r'<half>',
            '<div className={ns("half")}>',
            contents))
    contents = (
        re.sub(
            r'</half>',
            '</div>',
            contents))



    contents = (
        re.sub(
            r'<ul>',
            '<ul className={ns("content cozy")}>',
            contents))


    contents = (
        re.sub(
            r'<li>',
            '<li className={ns()}>',
            contents))


    headers = []

    while True:
        match = re.search(r'<h(.)>([^<]+)</h.>', contents)
        if match == None:
            break

        strength = match.group(1)
        header_text = match.group(2)
        anchor_name = header_text.lower()
        anchor_name = re.sub(r'[ \r\n-]+', '', anchor_name)

        replacement = '<a name="' + anchor_name + '"></a><h' + strength + ' className={ns()}>' + header_text + '</h' + strength + '>'
        
        contents = contents[:match.start()] + replacement + contents[match.end():]

        headers.append([header_text, anchor_name, int(strength)])


    contents = (
        re.sub(
            r'<Note name="([^"]+)">',
            '<Note name="\\1" iconsAndPositions={this.state.noteIconsAndPositions} update={this.updateNoteSizeAndCustomIcon}>',
            contents))
  



    margin_match = re.search(r'<margin>', contents)
    assert(margin_match != None)

    replacement = (
"""
              <div className={ns("margin")}>
                <div className={ns("toc-container")}>
                  <div className={ns("c-toc root")}>
""")

    replacement += '<b>' + title + '</b>'
    current_strength = 2
    replacement += '<ul>'

    for header_text, anchor_name, strength in headers:
        while current_strength < strength:
            replacement += "<ul>"
            current_strength = current_strength + 1

        while current_strength > strength:
            replacement += "</ul>"
            current_strength = current_strength - 1

        replacement += '<li><a href="/' + page_path + '#' + anchor_name + '">' + header_text + '</a></li>'

        while current_strength > 2:
            replacement += "</ul>"
            current_strength = current_strength - 1

    replacement += '</ul>'
    replacement += (
"""
                </div>

                <div className={ns("notes-header")}>
                  <NotesHeader update={this.updateNotesHeaderRect}/>
                </div>
              </div>
""")
    contents = contents[:margin_match.start()] + replacement + contents[margin_match.end():]



    contents = (
        re.sub(
            r'</margin>',
            '</div>',
            contents))






    while True:
        beginMatch = re.search(r'<c>', contents)
        if beginMatch == None:
            break
        beginMatchBegin = beginMatch.start()
        beginMatchEnd = beginMatch.end()
        beginMatch = None
        codeBeginIndex = beginMatchEnd

        endMatch = re.search(r'</c>', contents[codeBeginIndex:])
        assert(endMatch != None)
        codeEndIndex = codeBeginIndex + endMatch.start()
        endMatchEnd = codeBeginIndex + endMatch.end()
        endMatch = None

        code = contents[codeBeginIndex:codeEndIndex]
        # code = code.replace(r'<', '&lt;')
        # code = code.replace(r'>', '&gt;')

        contents = (
            contents[:beginMatchBegin] +
            '{incode("' + code + '")}' +
            contents[endMatchEnd:])

    while True:
        beginMatch = re.search(r'<vale>', contents)
        if beginMatch == None:
            break
        beginMatchBegin = beginMatch.start()
        beginMatchEnd = beginMatch.end()
        beginMatch = None
        codeBeginIndex = beginMatchEnd

        endMatch = re.search(r'</vale>', contents[codeBeginIndex:])
        assert(endMatch != None)
        codeEndIndex = codeBeginIndex + endMatch.start()
        endMatchEnd = codeBeginIndex + endMatch.end()
        endMatch = None

        vale_code = contents[codeBeginIndex:codeEndIndex]
        vale_code = vale_code.strip()
        replacement = highlight(sys.argv[1], vale_code)
        replacement = re.sub(r'«([^»]+)»', '{this.noteAnchor("\\1")}', replacement)

        contents = (
            contents[:beginMatchBegin] +
            '<Snippet header="Vale">' +
            replacement +
            '</Snippet>' +
            contents[endMatchEnd:])



#while re.search


    #highlight("bork")


    #sed -e 's!«\([0-9A-Za-z]*\)»!\{this.noteAnchor\("\1"\)\}!'

    output_file = sys.argv[3]
    
    with open(output_file, 'w') as file:
        file.write(contents)


if __name__ == '__main__':
    main()
