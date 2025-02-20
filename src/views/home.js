import { Header } from '../utils/header.js';
import { Footer } from '../utils/footer.js';
import {
  readingPost, editPost, deletePost, likingPost,
} from '../firebase/firestore.js';

const Home = () => {
  const container = document.createElement('div');
  container.className = 'home-page';
  const userUid = localStorage.getItem('userUid');
  readingPost((post) => {
    container.innerHTML = '';
    let postStructure = '';
    post.forEach((doc) => {
      const posts = doc.data();
      postStructure += `
      <div class="post">
        <div class='post-header'>
          <p class='user-info'><img class="user-photo" src="${posts.photo}">
          <span class="user-name">${posts.userName} posted: </span> </p>
          <p class="movie-review">${posts.review}</p>
          <p class="date">${posts.date.toDate().toLocaleString()}</p>
        </div>
        <div class="post-main">       
          <div class="movie-title">${posts.movie}</div>
          <p class='movie-country'>Country: ${posts.country} </p>
        </div>
        <div class="post-footer">
          <button class="btn-like" data-id="${doc.id}">
            <i class="fas fa-heart"></i>
            <span id="like-count" class="like-count"> ${posts.likesSum} </span>
          </button>
        </div>
      </div>
      `;
    });

    const middle = document.createElement('div');
    middle.className = 'middle';
    middle.innerHTML = postStructure;
    container.append(Header(), middle, Footer());

    const editBtn = container.querySelectorAll('.btn-Edit');
    const modal = container.querySelectorAll('.dialog-modal');

    // Open Modal
    editBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        modal.forEach((mod) => {
          if (mod.dataset.id === btn.dataset.id) {
            mod.showModal();

            // Updating Post
            const doneBtn = mod.querySelector('#done-button');
            doneBtn.addEventListener('click', async () => {
              const newReview = mod.querySelector('#new-review').value;
              const newMovie = mod.querySelector('#new-movie').value;
              const newCountry = mod.querySelector('#new-country').value;
              await editPost(mod.dataset.id, newReview, newMovie, newCountry);
            });
          }
        });
      });
    });

    // Deleting Post
    const deleteBtn = container.querySelectorAll('.btn-Delete');
    deleteBtn.forEach((btn) => {
      btn.addEventListener('click', async () => {
        await deletePost(btn.dataset.id);
      });
    });

    // Liking a Post
    const likeBtn = container.querySelectorAll('.btn-like');
    likeBtn.forEach((btn) => {
      btn.addEventListener('click', async () => {
        await likingPost(btn.dataset.id,userUid);
      });
    });
  });

  return container;
};

export default Home;
