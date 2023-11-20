
import React from 'react';
import "../styles/PostRow.sass"
import { Post } from '../../../../models/Post';
import { Points } from '../../points';
import PostMeta from '../../post/components/PostMeta';

interface PostRow2Props extends Post {
  onUpvoteClicked: () => void;
  onDownvoteClicked: () => void;
  isLoggedIn: boolean;
}

interface PostRow2State {
  activeFilter: string;
}

class PostRow extends React.Component<PostRow2Props> {

  constructor (props: PostRow2Props) {
    super(props);

    this.state = {
      activeFilter: 'POPULAR'
    }
  }

  render () {
    return (
      <div className="post-row">
        <Points
          onUpvoteClicked={() => this.props.onUpvoteClicked()}
          onDownvoteClicked={() => this.props.onDownvoteClicked()}
          points={this.props.points}
          isLoggedIn={this.props.isLoggedIn}
        />
        <div 
        onClick={() => this.props.onUpvoteClicked()}>
          ABCD
        </div>
      </div>
    )
  }
}



export default PostRow;