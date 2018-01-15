import React from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel';
import { green400, green600, blue400, blue600, red400, red600 } from 'material-ui/styles/colors';

export default class RotatingCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.data = 'need to get challenge data here';
  }

  render() {
    return (
      <div>
        <AutoRotatingCarousel
          label="Conquer this Challenge!"
          open
        >
          <Slide
            media={<img src="http://www.icons101.com/icon_png/size_256/id_79394/youtube.png" />}
            mediaBackgroundStyle={{ backgroundColor: red400 }}
            contentStyle={{ backgroundColor: red600 }}
            title="This is a very cool feature"
            subtitle="Just using this will blow your mind."
          />
          {
            this.state.data.map((item, index) => (
              <span className='indent' key={index} />
            ))
          }
        </AutoRotatingCarousel>
      </div>
    );
  }
}
