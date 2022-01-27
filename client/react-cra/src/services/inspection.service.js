import { httpClient } from "../http/http.client";

export class InspectionService {
  static async createInspection(input) {
    const response = await httpClient.post("/inspection", input);
    return response.data;
  }

  static async uploadImage(productId, file) {
    const form = new FormData();

    form.append("image", file);

    const response = await httpClient.post(
      `/inspection/image/${productId}`,
      form
    );

    return response.data;
  }
}
