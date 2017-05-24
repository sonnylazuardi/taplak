package info.androidhive.floatingview.http;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;

/**
 * Created by imrenagi on 5/24/17.
 */

public class BukalapakHeaderInterceptor implements Interceptor {

    @Override
    public Response intercept(Chain chain) throws IOException {

        Request.Builder builder = chain.request().newBuilder();
        builder.addHeader("Content-Type", "application/x-www-form-urlencoded");

        //TODO need to change this authorization header based on the logged in user
        builder.addHeader("Authorization", "Basic Fh1bpiw1mRPrCDpto");
        return chain.proceed(builder.build());
    }
}
