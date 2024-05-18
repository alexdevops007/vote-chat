// Importez les composants nécessaires de Vue Test Utils
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import NavBar from "@/components/nav/NavBar.vue";

describe("NavBar", () => {
  it("affiche les liens router correctement", () => {
    // Créez une instance de routeur pour les tests
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "Accueil" },
        { path: "/vote", name: "Vote" },
        { path: "/cat-list", name: "Liste des chats" },
        { path: "/favorites", name: "Favoris" },
      ],
    });

    // Montez le composant Navbar avec le routeur créé pour les tests
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    // Trouvez les composants router-link dans le wrapper
    const routerLinks = wrapper.findAllComponents({ name: "RouterLink" });

    // Vérifiez le nombre de liens router
    expect(routerLinks.length).toBe(4);

    // Vérifiez les noms de route des liens
    routerLinks.forEach((link) => {
      expect(link.props().to.name).toBe(router.currentRoute.value.name);
    });
  });
});
