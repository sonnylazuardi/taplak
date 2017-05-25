package info.androidhive.floatingview.http;

import android.util.Log;

import java.io.IOException;

import info.androidhive.floatingview.model.User;
import info.androidhive.floatingview.services.BukalapakApiService;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import retrofit2.Call;
import retrofit2.Callback;

/**
 * Created by imrenagi on 5/24/17.
 */

public class BukalapakHeaderInterceptor implements Interceptor{

    private BukalapakApiService blApiService = new BukalapakApiService();

    public BukalapakHeaderInterceptor() {

    }
    @Override
    public Response intercept(Chain chain) throws IOException {

        Request.Builder builder = chain.request().newBuilder();
        builder.addHeader("Content-Type", "application/x-www-form-urlencoded");

        //TODO need to change this authorization header based on the logged in user
        builder.addHeader("Authorization", "Basic Fh1bpiw1mRPrCDpto");
        return chain.proceed(builder.build());
    }
}
