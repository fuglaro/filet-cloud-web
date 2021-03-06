"use strict"
/**
 * Loads the pdf specified by the "path" argument from the "file" endpoint.
 * Creates a canvas in the body for each page of the pdf and renders
 * all pages onto them.
 * Uses pdfjs for the rendering. PDF.js is mighty.
 */
function load(path) {
	pdfjsLib.getDocument(`file?path=${encodeURIComponent(path)}`).promise
	.then(pdf=> {
		for (var i = 0; i < pdf.numPages; i++) {
			pdf.getPage(i+1).then(page=> {
				let nib = document.createElement('canvas')
				let ctx = nib.getContext("2d");
				let vp = page.getViewport({ scale: 1 });
				nib.height = vp.height;
				nib.width = vp.width;
				page.render({ canvasContext: ctx, viewport: vp })
				document.body.appendChild(nib)
			})
		}
	})
}
