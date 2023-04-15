import React, { useState } from "react";
import style from "./dynamicDesc.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ReactMarkdown from "react-markdown";

const DynamicDesc = ({ title, content, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {title && (
        <div
          className={`${style.container} ${open ? style.open : style.closed}`}
        >
          <div className={style.title} onClick={() => setOpen((prev) => !prev)}>
            <h3>{title}</h3>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          <div className={style.content}>
            {/* {console.log(Array.isArray(content))} */}
            {content && Array.isArray(content) ? (
              content.map((el, id) => (
                <div key={id}>
                {/* {console.log(el.attributes.question)} */}
                  <h3>{el.attributes.question}</h3>
                  <p>{el.attributes.response}</p>
                </div>
              ))
            ) : (
              <ReactMarkdown escapeHTML={false}>{content}</ReactMarkdown>
            )}
            {children && children}
          </div>
          <div className={style.divider}></div>
        </div>
      )}
    </>
  );
};

export default DynamicDesc;
