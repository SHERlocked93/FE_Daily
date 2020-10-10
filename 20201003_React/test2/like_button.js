class LikeButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false
        }
    }

    render() {
        const { like } = this.state
        console.log(this.state)
        return (
          <h2 onClick={ () => this.setState({ like: !this.state.like }) }>
              this is h2 { like ? '是' : '否' }
          </h2>
        )
    }
}

const domContainer = document.querySelector('#like_button_container')
ReactDOM.render(React.createElement(LikeButton), domContainer)
