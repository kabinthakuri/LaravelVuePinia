import axios from "axios";
import { defineStore } from "pinia";

export const PostStore = defineStore("post", {
  state: () => ({
    posts: [],
    edit_id: null,
    title: null,
    description: null,
    image: null,
    loading: false,
  }),

  getters: {

  },

  actions: {
    addItem () {
      this.loading = true;
      let formData = new FormData();
      
      formData.append('title',this.title);
      formData.append('description', this.description);
      formData.append('image', this.image);
      
      let config = {
        header: {
          'Content-Type' : 'image/png'
        }
      }

      if(this.edit_id) {
        formData.append('_method', 'put');
        console.log(formData);
        axios.post('api/post/'+this.edit_id, formData, config).then(() => {
          this.fetchItem();
          this.resetData();
          this.loading = false;
          this.edit_id = null;
        });
      }else {
        axios.post('api/post', formData, config).then((response) => {
          this.fetchItem();
          this.resetData();
          this.loading = false;
        });
      }
    },
    async fetchItem() {
      let post = await axios.get('api/post');
      this.posts = post.data;
    },

    editItem(id) {
       let post = this.posts.find(post => post.id == id);
       this.title = post.title;
       this.description = post.description;
       this.edit_id = post.id;
    },

    async deleteItem(id) {
      try {
        await axios.delete('api/post/'+id).then((response) => {
          this.fetchItem();
        });
      }catch(e) {
        console.log(e);
      }
    },

    changeImage(event) {
      this.image = event.target.files[0];
    },

    resetData() {
      this.title = null;
      this.description = null;
      this.image = null;
    },
  },
});