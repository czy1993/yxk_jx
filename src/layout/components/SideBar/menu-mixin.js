export default {
  computed: {
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ["SideBar", "SubSide"].indexOf(parent.$options._componentTag) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      let padding = 20;
      let parent = this.$parent;

      while (parent && parent.$options._componentTag !== "SideBar") {
        // console.log(parent);
        if (parent.$options._componentTag === "sub-side") {
          // console.log(parent);
          padding += 15;
        }
        parent = parent.$parent;
      }

      return { paddingLeft: padding + "px" };
    },
    hasChildren(menu) {
      return (menu) => {
        let num = menu.children.reduce((acc, cur) => {
          if (cur.type === "1") {
            acc += 1;
          }
          return acc;
        }, 0);
        if (num > 0) {
          return true;
        }
        return false;
      };
    }
  }
};
