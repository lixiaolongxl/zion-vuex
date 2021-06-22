export default {
    props: {
      tag: {
        type: String,
        default: 'a',
      },
  
      to: {
        type: String,
        required: true,
      },
    },
  
    methods: {
      handler() {
        this.$router.push(this.to);
      },
    },
  
    render() {
      const tag = this.tag;
      return <tag onClick={this.handler}>{this.$slots.default}</tag>;
    },
  };