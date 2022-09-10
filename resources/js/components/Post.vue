<template>
  <div class="container pt-2">
    <div class="row">
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="post in posts" :key="post.id">
            <div class="card m-2">
              <img :src="/images/+post.image"  v-if="post.image">
              <div class="card-body">
                <div class="card-title">
                  {{post.title}}
                </div>
                <small class="text-muted">
                  20 minutes ago
                </small>
                <div class="card-text">
                  {{post.description}}
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between bg-transparent border-top-0">
                <button class="btn btn-default btn-sm" @click="editItem(post.id)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteItem(post.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card">
          <div class="card-body">
            <form method="post" @submit.prevent="addItem">
              <div class="form-group">
                <input type="text" placeholder="Title" class="form-control" v-model="title">
              </div>
              <div class="form-group">
                <textarea placeholder="Description.." rows="7" class="form-control" v-model="description"></textarea>
              </div>
              <div class="form-group">
                <input type="file" class="form-control" @change="changeImage($event)">
              </div>
              <button class="btn btn-dark">{{ loading ?   'Loading...' : (edit_id ? 'Update' : 'Save') }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { PostStore } from "@/store/PostStore";

const { posts, title, edit_id, description, loading } = storeToRefs(PostStore());
const { addItem, fetchItem, changeImage, editItem, deleteItem } = PostStore();
fetchItem();
</script>
