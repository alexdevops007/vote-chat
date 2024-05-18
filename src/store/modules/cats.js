import { defineStore } from "pinia";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { fetchCats } from "@/services/catService";

export const useCatsStore = defineStore("cats", {
  state: () => ({
    cats: [],
    votes: {},
    favorites: [],
  }),
  getters: {
    totalVotes() {
      return Object.values(this.votes).reduce(
        (total, votes) => total + votes,
        0
      );
    },
    getCatVotes: (state) => (id) => {
      return state.votes[id] || 0;
    },
    isFavorite: (state) => (id) => {
      return state.favorites.includes(id);
    },
  },
  actions: {
    async fetchAndSetCats() {
      try {
        const cats = await fetchCats();
        this.cats = cats;
        this.setCats(cats);
        this.restoreFavorites();
      } catch (error) {
        console.error("Error fetching cats:", error);
      }
    },
    setCats(cats) {
      this.votes = cats.reduce((acc, cat) => {
        acc[cat.id] = 0;
        return acc;
      }, {});
    },
    voteCat(id) {
      // Update vote count
      this.$patch((state) => {
        if (!state.votes[id]) {
          state.votes[id] = 1;
        } else {
          state.votes[id]++;
        }
      });
      // Save state
      this.saveState();
    },
    toggleFavorite(cat) {
      const index = this.favorites.indexOf(cat.id);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(cat.id);
      }
      this.saveFavorites();
    },
    saveState() {
      setLocalStorageItem("catsState", this.$state);
    },
    restoreState() {
      const savedState = getLocalStorageItem("catsState");
      if (savedState) {
        this.$state = savedState;
      }
    },
    restoreFavorites() {
      const savedFavorites = getLocalStorageItem("catsFavorites");
      if (savedFavorites) {
        this.favorites = savedFavorites;
      }
    },
    saveFavorites() {
      setLocalStorageItem("catsFavorites", this.favorites);
    },
    getRandomCats(count) {
      const shuffledCats = this.cats.sort(() => Math.random() - 0.5);
      return shuffledCats.slice(0, count);
    },
    getCatsWithScore() {
      let catsWithScore = getLocalStorageItem("catsWithScore");
      if (!catsWithScore) {
        catsWithScore = this.cats
          .map((cat) => ({
            id: cat.id,
            url: cat.url,
            score: this.getCatVotes(cat.id),
          }))
          .sort((a, b) => b.score - a.score);
        setLocalStorageItem("catsWithScore", catsWithScore);
      }
      return catsWithScore;
    },
  },
});