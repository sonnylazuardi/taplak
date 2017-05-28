package info.androidhive.floatingview.services;

import info.androidhive.floatingview.model.APIAIRequest;
import info.androidhive.floatingview.model.APIAIResponse;
import info.androidhive.floatingview.model.ProductResponse;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Headers;
import retrofit2.http.POST;
import retrofit2.http.Query;

/**
 * Created by inagi on 5/24/17.
 */

public interface ApiAiService {

    @Headers({
            "Content-Type: application/json; charset=utf-8",
            "Authorization: Bearer 80f17fc80ce8426fa5e0fdbc1026c083"
    })
    @POST("query?v=20150910")
    Call<APIAIResponse> query(@Body APIAIRequest request);

    public static final Retrofit retrofit = new Retrofit.Builder()
            .baseUrl("https://api.api.ai/v1/")
            .addConverterFactory(ScalarsConverterFactory.create())
            .addConverterFactory(GsonConverterFactory.create())
            .build();

}


