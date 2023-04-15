import React from 'react';
import style from './tags.module.scss';

const Tags = ({tags}) => {
  return (
    <div className={style.container}>
        {tags.map((tag)=>(
            <div key={tag.id} className={style.tag} href={tag.attributes.link}>{tag.attributes.name}</div>
        ))}
    </div>
  )
}

export default Tags