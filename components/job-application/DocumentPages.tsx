import React, { useEffect, useState, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const PAGE_HEIGHT = 1330;
const PAGE_PADDING = 48;
const CONTENT_HEIGHT = PAGE_HEIGHT - (PAGE_PADDING * 2);

interface Props {
  children: React.ReactNode;
}

export const DocumentPages: React.FC<Props> = ({ children }) => {
  const [pages, setPages] = useState([0, 1]);
  const contentRef = useRef(null);
  const childrenArray = React.Children.toArray(children);
  console.log('children', renderToStaticMarkup(children));
  console.log('childrenArray', childrenArray);

  // useEffect(() => {
  //   const observer = new ResizeObserver((entry) => {

  //     if (!contentRef.current) return;
      
  //     const content = contentRef.current;
  //     const totalHeight = content.scrollHeight;
  //     const neededPages = Math.ceil(totalHeight / CONTENT_HEIGHT);
      
  //     if (neededPages !== pages.length) {
  //       setPages(Array.from({ length: neededPages }, (_, i) => i));
  //     }
  //   });

  //   if (contentRef.current) {
  //     observer.observe(children);
  //   }

  //   return () => observer.disconnect();
  // }, [pages.length]);

  // useEffect(() => {
  //   const observer = new ResizeObserver(() => {
  //     if (!contentRef.current) return;
      
  //     const content = contentRef.current;
  //     const totalHeight = content.scrollHeight;
  //     const neededPages = Math.ceil(totalHeight / CONTENT_HEIGHT);
      
  //     if (neededPages !== pages.length) {
  //       setPages(Array.from({ length: neededPages }, (_, i) => i));
  //     }
  //   });

  //   if (contentRef.current) {
  //     observer.observe(contentRef.current);
  //   }

  //   return () => observer.disconnect();
  // }, [pages.length]);

  return (
    <div className="w-full min-h-screen bg-base-200 py-8 flex flex-col items-center gap-8">
      {pages.map((pageIndex) => (
        <div
          key={pageIndex}
          className="w-[940px] h-[1330px] bg-white shadow-lg relative"
          style={{
            breakInside: 'avoid',
            pageBreakInside: 'avoid'
          }}
        >
          <div className="absolute inset-0 p-12">
            <div
              ref={pageIndex === 0 ? contentRef : null}
              id={`page-${pageIndex}`}
              className="absolute inset-12"
              style={{
                transform: `translateY(${pageIndex * -CONTENT_HEIGHT}px)`,
                height: pages.length * CONTENT_HEIGHT
              }}
            />
          </div>
          <div className="absolute bottom-4 right-4 text-sm text-gray-400">
            {pageIndex + 1}/{pages.length}
          </div>
        </div>
      ))}
    </div>
  );
};