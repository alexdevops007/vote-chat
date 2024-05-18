import { mount } from "@vue/test-utils";
import CatCard from "@/components/common/CatCard.vue";

describe("CatCard.vue", () => {
  it('emits "vote" event when the image is clicked', async () => {
    // Créer une fonction de rappel simulée
    const onVote = jest.fn();

    // Montage du composant avec les props nécessaires
    const wrapper = mount(CatCard, {
      props: {
        cat: { id: 1, url: "http://example.com/cat.jpg" },
        onVote: onVote,
      },
    });

    // Trouver l'image et simuler un clic
    const image = wrapper.find("img");
    await image.trigger("click");

    // Vérifier si la fonction de rappel a été appelée avec l'ID correct du chat
    expect(onVote).toHaveBeenCalledWith(1);
  });
});
