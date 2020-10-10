class LikeButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false
        }
    }

    render() {
        return (
          React.createElement(
            'h2',
            {
                onClick: () => this.setState({ like: !this.state.like })
            },
            'this is h2  ' + this.state.like)
        )
    }

}

const domContainer = document.querySelector('#like_button_container')
ReactDOM.render(React.createElement(LikeButton), domContainer)
