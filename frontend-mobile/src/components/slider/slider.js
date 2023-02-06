import { FlatList, View } from "react-native";
import image from "../../assets/images/home-banner.png";
import { SlideItem } from "./slide_item";
export function Slider() {
  const data = [
    {
      id: 1,
      title: "Bem vindo ao Aplicativo Oficial da Black Diamond!",
    },
    {
      id: 2,
      title:
        "Com ele voce pode aproveitar todas as conveniencias da nossa academia",
      image: image,
    },
    {
      id: 3,
      title:
        "Acompanhe as noticias, acompanhe os itens disponiveis na loja e muito mais!",
    },
  ];
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
      />
    </View>
  );
}
