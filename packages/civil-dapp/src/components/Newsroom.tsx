import * as React from 'react';

export interface NewsroomState {
  listingState: string;
}
export interface NewsroomProps {
  match: any;
}

class Newsroom extends React.Component<NewsroomProps, NewsroomState> {
  render() {
    return (
      <div>
        Newsroom: {this.props.match.params.newsroomAddress}
      </div>
    );
  }
}

export default Newsroom;
