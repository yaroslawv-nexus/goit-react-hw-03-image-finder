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

  render() {
    const { submitSearch } = this.props;
    return (
      <SearchbarStyled>
        <SearchForm
          onSubmit={e => {
            e.preventDefault();
            submitSearch(this.state.value);
          }}
        >
          <SearchButton type="submit">
            <SearchSVG />
          </SearchButton>

          <SearchInput
            onChange={({ target }) => {
              this.setState({ value: target.value });
            }}
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
