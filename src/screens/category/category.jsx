import { memo } from "react";
import { useQueryCategories } from "../../hooks";
import { tw } from "../../components";
import { GridBook } from "../../components/grid-book";
import { Screen } from "react-native-screens";

export const Category = memo(() => {
  const { data, isFetching, error, status } = useQueryCategories();
  return (
    <Screen style={tw`bg-white flex-1`}>
      <GridBook
        status={status}
        data={data}
        error={error}
        isFetching={isFetching}
        isCategory={true}
      />
    </Screen>
  );
});
