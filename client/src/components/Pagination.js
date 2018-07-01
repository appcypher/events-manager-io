import React from 'react';

/**
 * Implements pagination for switching pages.
 */
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageLink: 1,
    };
  }

  changePage = (e) => {
    const pageNumber = Number(e.currentTarget.dataset.id);
    this.props.getPage(pageNumber);
    this.setState({ activePageLink: pageNumber });
  }

  checkActive = (pageNumber) => {
    if (this.state.activePageLink === pageNumber) return 'active';
    return '';
  }

  render() {
    return (
      <div className="io-col-center">
        <ul className="pagination">
          <li id="pagePrevious" className="page-item disabled"><span className="page-link">&lt;&lt;</span></li>
          <li className={`page-item ${this.checkActive(1)}`}><span className="page-link" data-id="1" onClick={this.changePage}>1</span></li>
          <li className={`page-item ${this.checkActive(2)}`}><span className="page-link" data-id="2" onClick={this.changePage}>2</span></li>
          <li className={`page-item ${this.checkActive(3)}`}><span className="page-link" data-id="3" onClick={this.changePage}>3</span></li>
          <li className={`page-item ${this.checkActive(4)}`}><span className="page-link" data-id="4" onClick={this.changePage}>4</span></li>
          <li id="pageNext" className="page-item disabled"><span className="page-link">&gt;&gt;</span></li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
