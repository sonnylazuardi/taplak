package info.androidhive.floatingview.http;

import java.io.IOException;

import info.androidhive.floatingview.services.BukalapakApiService;
import okhttp3.Interceptor;
import okhttp3.Request;
import okhttp3.Response;
import android.util.*;
/**
 * Created by Philip on 25/5/17.
 */

public class BukalapakLoginInterceptor implements Interceptor{

    String username;
    String password;

    public BukalapakLoginInterceptor(String username, String password) {
        this.username=username;
        this.password=password;
    }

    @Override
    public Response intercept(Chain chain) throws IOException {
        Request.Builder builder = chain.request().newBuilder();
        String credentials = username + ":" + password;
        // create Base64 encodet string
        final String basic =
                "Basic " + Base64.encodeToString(credentials.getBytes(), Base64.NO_WRAP);
        builder.addHeader("Authorization", basic);
        builder.addHeader("Accept", "application/json");
        return chain.proceed(builder.build());
    }
}
