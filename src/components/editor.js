import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';

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
      contentType: 'text',
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
      toast.error('Please fill in all required fields');
      return;
    }
    let coverUrl = this.state.cover_url;
    if (coverUrl == '') {
      if (this.state.contentType == 'text') {
        coverUrl = 'https://cdn4.iconfinder.com/data/icons/devine_icons/Black/PNG/File%20Types/Defult%20Text.png';
      } else if (this.state.contentType == 'link') {
        coverUrl = 'https://png.icons8.com/metro/1600/link.png';
      } else {
        coverUrl = this.state.content;
      }
    }
    const post = {
      title: this.state.title,
      content: this.state.content,
      tags: this.state.tags,
      cover_url: coverUrl,
      contentType: this.state.contentType,
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
      <div className="editor-container">
        <div className="field-title"> Title: <span className="required-star"> * </span> </div>
        <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
        <br />
        <div className="field-title"> Select content type: <span className="required-star"> * </span> </div>
        <select onChange={this.handleChange} name="contentType" value={this.state.contentType}>
          <option value="text">Text</option>
          <option value="image">Image/GIF</option>
          <option value="link">Link</option>
        </select>
        <br />
        <br />
        <div className="field-title"> Content: <span className="required-star"> * </span></div>
        <TextareaAutosize onChange={this.handleChange} name="content" value={this.state.content} minRows={5} />
        <br />
        <div className="field-title"> Tags: <span className="required-star"> * </span></div>
        <div className="field-helper"> Start tags with hashtags, and separate with spaces (e.g. #post #funny) </div>
        <input onChange={this.handleChange} type="text" name="tags" value={this.state.tags} />
        <br />
        <div className="field-title"> Cover URL: </div>
        <div className="field-helper"> Preview image displayed. Leave blank for default. </div>
        <input onChange={this.handleChange} type="text" name="cover_url" value={this.state.cover_url} />
        <br />
        <button onClick={this.submitPost}> {this.props.buttonText} </button>
        <br />
        <br />
        <div className="field-helper"> <span className="required-star"> * </span> indicates a required field </div>
      </div>
    );
  }
}

export default Editor;
