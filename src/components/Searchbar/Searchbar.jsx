import React, { Component } from 'react';
import {
  SearchbarStyled,
  SearchButton,
  SearchForm,
  SearchInput,
  SearchSVG,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.submitSearch(this.state.value);
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <SearchbarStyled>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchButton type="submit">
            <SearchSVG />
          </SearchButton>

          <SearchInput
            onChange={this.onChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
          />
        </SearchForm>
      </SearchbarStyled>
    );
  }
}
