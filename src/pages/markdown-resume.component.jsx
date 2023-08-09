import React, {useState, useEffect, useRef } from 'react';
import ReactMarkdown from "react-markdown";
import html2pdf from "html2pdf.js";
import { downloadFile } from "../download-helper/download-helper";

const MarkdownResume = () => {
    const [markdownContent, setMarkdownContent] = useState('');
    const resumeRef = useRef(null); // Reference to the div that will be converted to PDF

    useEffect(() => {
        // Adjust the path to your markdown file if it's different.
        fetch('/resume.md')
            .then(response => response.text())
            .then(text => setMarkdownContent(text));
    }, []);

    const exportToPDF = () => {
        console.log("button clicked")
        const element = resumeRef.current;
        console.log(element);
        const opt = {
            margin:       0,
            filename:     'resume.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        console.log(opt);

        const pdf = html2pdf(element, opt);
        console.log(pdf);

        pdf.outputPdf().then((pdfBlob) => {
            console.log("Creating PDF blob");
            const pdfURL = URL.createObjectURL(pdfBlob);
            downloadFile(pdfURL, 'resume.pdf');
        });
    }

    return (
        <div className="markdown-resume-container" ref={resumeRef}>
            <h1>Alvacir Wesley Kalatai Alberti</h1>
            <p><a href="mailto:wesley@aw.dev.br">wesley@aw.dev.br</a> | Madrid, Spain | +34 650 80 40 98 | <a href="https://aw.dev.br/">aw.dev.br</a> | <a href="https://www.linkedin.com/in/wesaka/">linkedin.com/in/wesaka/</a></p>
            <div className="resume-body"></div>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
            <button onClick={exportToPDF}>Export to PDF</button>
        </div>
    );
};

export default MarkdownResume;