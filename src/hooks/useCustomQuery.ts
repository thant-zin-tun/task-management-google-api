import { useQuery, UseQueryResult, QueryKey } from "@tanstack/react-query";

export const useCustomQuery = <Data = any>(
  queryKey: QueryKey,
  queryFn: () => Promise<Data>
): UseQueryResult<Data> => {
  const queryResult = useQuery<Data>({
    queryKey,
    queryFn,
  });
  return queryResult;
};

export const useCustomQueryByID = <Data = any>(
  queryKey: QueryKey,
  queryFunction: (id: number) => Promise<Data>
): UseQueryResult<Data> => {
  const id = Array.isArray(queryKey) ? queryKey[1] : undefined;
  const queryResult = useQuery<Data>({
    queryKey,
    queryFn: () => queryFunction(id),
  });
  return queryResult;
};

//Usage

// const { isPending, error, data } = useCustomQuery<Product[]>(
//   ["product"],
//   fetchProduct
// );

// const { data: product } = useCustomQueryByID<Product>(
//   ["product", 5],
//   fetchProductById
// );

// const { data: productFilter } = useCustomQueryByFilter<Product[]>(
//   ["product", { sort: "desc" }],
//   fetchProductByFilter
// );

// const { status, mutateAsync } = useMutation({
//   mutationKey: ["customer"],
//   mutationFn: addCustomer,
//   retry: 2,
// });

// mutateAsync(
//   {
//     name: "Kalay Lay",
//     phone: "09998533437",
//     address: "‌မြောက်ဒဂုံ 43 ရပ်ကွက် ၊ ‌‌ရတနာ ၄ လမ်း",
//     profile_image: null,
//     email: "htethtet@gmail.com",
//     isCustomer: true,
//     id: null,
//   },
//   {
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: ["customer"] });
//     },
//     onError: (error) => {
//       alert("Error");
//     },
//   }
// );
