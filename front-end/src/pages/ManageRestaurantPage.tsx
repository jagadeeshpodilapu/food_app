import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { getRestaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm restaurant={getRestaurant} onSave={createRestaurant} isLoading={isCreateLoading} />
  );
};

export default ManageRestaurantPage;
