import React, { Component } from 'react';

/*
Props:
- buttonText: the text that goes on the submit button
- submitPost: the callback function for when the submit button is hit, accepts a note
*/
class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      contentType: 'image',
      cover_url: '',
    };
    if (this.props.loadedPost) {
      this.state = {
        title: this.props.loadedPost.title,
        content: this.props.loadedPost.content,
        tags: this.props.loadedPost.tags,
        contentType: this.props.loadedPost.contentType,
        cover_url: this.props.loadedPost.cover_url,
      };
    }

    this.validatePost = this.validatePost.bind(this);
    this.submitPost = this.submitPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validatePost() {
    if (
      this.state.title == '' ||
      this.state.content == '' ||
      this.state.tags == ''
    ) {
      return false;
    }
    return true;
  }

  submitPost() {
    if (!this.validatePost()) {
      alert('Please fill out all required fields');
      return;
    }
    let coverUrl = this.state.cover_url;
    if (coverUrl == '') {
      if (this.state.contentType == 'text') {
        coverUrl = 'src/img/text.png';
      } else if (this.state.contentType == 'link') {
        coverUrl = 'src/img/link.png';
      } else {
        coverUrl = this.state.content;
      }
    }
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      cover_url: coverUrl,
    };

    this.props.submitCallback(post);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div> *Title: </div>
        <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
        <br />
        <div> *Select content type: </div>
        <select onChange={this.handleChange} name="contentType">
          <option value="text">Text</option>
          <option value="image">Image/GIF</option>
          <option value="link">Link</option>
        </select>
        <br />
        <div> *Content: </div>
        <input onChange={this.handleChange} type="text" name="content" value={this.state.content} />
        <br />
        <div> *Tags: </div>
        <input onChange={this.handleChange} type="text" name="tags" value={this.state.tags} />
        <br />
        <div> Cover URL: </div>
        <input onChange={this.handleChange} type="text" name="cover_url" value={this.state.cover_url} />
        <br />
        <button onClick={this.submitPost}> {this.props.buttonText} </button>
      </div>
    );
  }
}

export default Editor;
