package info.androidhive.floatingview.services;

import info.androidhive.floatingview.model.ProductResponse;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Created by imrenagi on 5/23/17.
 */

public interface BukalapakService {

    @GET("products.json")
    Call<ProductResponse> getProducts(
            @Query("keywords") String keywords,
            @Query("page") Integer pageNumber,
            @Query("per_page") Integer limitPerPage);

    public static final Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://api.bukalapak.com/v2/")
            .addConverterFactory(GsonConverterFactory.create())
            .build();
}
