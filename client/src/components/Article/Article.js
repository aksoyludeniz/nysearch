import React from "react";
import formatDate from "../../utils/formatDate";

const Article = ({ _id, title, url, date, isSaved, onSave, onDelete }) => (
  <div className="card mb-3" key={_id}>
    <div className="card-body">
      <h3 className="mb-2">{title}</h3>
      {onSave ? (
        <button  onClick={onSave}><i className="fas fa-bookmark"></i> Save</button>
      ) : (
        <button className="btn btn-danger mr-1" onClick={onDelete}><i className="fas fa-trash"></i> Delete</button>
      )}
      <a href={url} target="_blank" className="btn btn-light"><i className="fas fa-globe"></i> Visit website</a>
    </div>
  </div>
);

export default Article;
