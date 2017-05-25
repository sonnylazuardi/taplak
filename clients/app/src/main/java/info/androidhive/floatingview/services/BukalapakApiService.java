package info.androidhive.floatingview.services;

import java.io.IOException;
import java.util.List;

import info.androidhive.floatingview.http.BukalapakHeaderInterceptor;
import info.androidhive.floatingview.http.BukalapakLoginInterceptor;
import info.androidhive.floatingview.model.Product;
import info.androidhive.floatingview.model.ProductResponse;
import okhttp3.OkHttpClient;
import retrofit2.Call;

/**
 * Created by imrenagi on 5/23/17.
 */

public class BukalapakApiService {

    private BukalapakService service;

    public BukalapakApiService() {
        service = BukalapakService.retrofit.create(BukalapakService.class);

//        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
//
//        //TODO don't intercept the header if user is not logged in. Need to change this later.
//        httpClient.addNetworkInterceptor(new BukalapakHeaderInterceptor(username, password));
    }


    public BukalapakService getService() {
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

        httpClient.addNetworkInterceptor(new BukalapakHeaderInterceptor());
        return service;
    }

    public BukalapakService getLoginService(String username, String password){
        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

        httpClient.addNetworkInterceptor(new BukalapakLoginInterceptor(username, password));
        return service;
    }
}
