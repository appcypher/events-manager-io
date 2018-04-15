import React from 'react';

const Pagination = () => (
  <div className="io-col-center">
    <ul className="pagination">
      <li className="page-item disabled"><a href="/" className="page-link">&lt;&lt;</a></li>
      <li className="page-item active"><a href="/" className="page-link">1</a></li>
      <li className="page-item"> <a href="/" className="page-link">2</a></li>
      <li className="page-item"> <a href="/" className="page-link">3</a></li>
      <li className="page-item"> <a href="/" className="page-link">4</a></li>
      <li className="page-item"> <a href="/" className="page-link">5</a></li>
      <li className="page-item"> <a href="/" className="page-link">&gt;&gt;</a></li>
    </ul>
  </div>
);

export default Pagination;
