import React, { Component } from 'react';
import {
    Pagination, PaginationItem,
    PaginationLink,
} from 'reactstrap';

export default class PaginationComponent extends Component {
    nextPage = () => {
        this.props.onNextPage();
    }
    prevPage = () => {
        this.props.onPrevPage();
    }
    setActivePrevPage = () => {
        let props = {};
        if (!this.props.hasPrevPage) {
            props.disabled = true;
        } else {
            props.disabled = false
        }
        return props;
    }
    setActiveNextPage = () => {
        let props = {};
        if (!this.props.hasNextPage) {
            props.disabled = true;
        } else {
            props.disabled = false
        }
        return props;
    }
    isActive = (i) => {
        let props = {};
        if (this.props.currentPage == i) {
            props.active = true;
        } else {
            props.active = false;
        }
        return props;
    }
    selectPage = (page) => {
        this.props.onSelectPage(page);
    }
    setPages = () => {
        let items = [];
        for (let i = 1; i <= this.props.pages; i++) {
            items.push(<PaginationItem key={i} onClick={() => { this.selectPage(i); }} {...this.isActive(i)}>
                <PaginationLink>
                    {i}
                </PaginationLink>
            </PaginationItem>)
        }
        return items;
    }
    render() {
        return (
            <Pagination className="pagination-sm" aria-label="Page navigation example" style={{overflowX: 'auto'}}>
                <PaginationItem {...this.setActivePrevPage()}>
                    <PaginationLink previous onClick={this.prevPage} />
                </PaginationItem>
                {this.setPages()}
                <PaginationItem {...this.setActiveNextPage()}>
                    <PaginationLink next onClick={this.nextPage} />
                </PaginationItem>
            </Pagination>
        );
    }
}