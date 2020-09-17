import React, { useEffect, useRef } from "react";

export default ({ width, height, src, ...props }) => {
    const canvasRef = useRef(null)
    useEffect(() => {
        if (src && canvasRef.current) {
            loadPdf(src)
            .then(loadPage(1))
            .then(makePdfThumb({ canvas: canvasRef.current }))
            .catch((e) => console.log('pdf err', src, e))
        }
    }, [src, canvasRef])  
  return <canvas ref={canvasRef} width={width} height={height} {...props} />;
};

export const loadPdf = (src) => window.pdfjsLib.getDocument(src).promise
export const loadPage = (num) => (doc) => doc.getPage(num)
export const makePdfThumb = ({ canvas }) => page =>  {
    // const vp = page.getViewport(1);
    // const scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
    return page
    .render({
      canvasContext: canvas.getContext("2d"),
      viewport: page.getViewport(1),
    }).promise
}