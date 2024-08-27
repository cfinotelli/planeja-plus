import { useRepoStore } from "@/stories/repo/repo-store";
import { View } from "react-native";
import { HomeLabelList } from "./home-label-list";
import { ListItemLink } from "./list-item-link";
import { ListsEmpty } from "./lists-empty";

export const HomeLists = () => {
  const { lists } = useRepoStore((state) => state);

  return (
    <>
      <HomeLabelList
        title="Minhas Listas"
        sectionType="lista"
        quantity={lists.length}
        isOdd={lists.length !== 1}
      />

      {lists.length >= 1 ? (
        <>
          {lists.map((list) => (
            <View key={list.id} className="mb-1.5">
              <ListItemLink id={list.id} itemTitle={list.title} />
            </View>
          ))}
        </>
      ) : (
        <ListsEmpty />
      )}
    </>
  );
};
