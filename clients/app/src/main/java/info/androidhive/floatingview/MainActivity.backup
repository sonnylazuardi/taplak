package info.androidhive.floatingview;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import java.util.Map;

import info.androidhive.floatingview.http.BukalapakHeaderInterceptor;
import info.androidhive.floatingview.model.APIAIRequest;
import info.androidhive.floatingview.model.APIAIResponse;
import info.androidhive.floatingview.model.ProductResponse;
import info.androidhive.floatingview.services.ApiAiClientService;
import info.androidhive.floatingview.services.BukalapakApiService;
import okhttp3.Interceptor;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private static final int CODE_DRAW_OVER_OTHER_APP_PERMISSION = 2084;

    private BukalapakApiService blApiService;
    private Interceptor blHeaderInterceptor = new BukalapakHeaderInterceptor();

    private ApiAiClientService apiaiService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        startService(new Intent(this, ClipboardMonitorService.class));
        //Check if the application has draw over other apps permission or not?
        //This permission is by default available for API<23. But for API > 23
        //you have to ask for the permission in runtime.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {

            //If the draw over permission is not available open the settings screen
            //to grant the permission.
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:" + getPackageName()));
            startActivityForResult(intent, CODE_DRAW_OVER_OTHER_APP_PERMISSION);
        } else {
            initializeView();
        }

        this.blApiService = new BukalapakApiService(this.blHeaderInterceptor);

        blApiService.getService().getProducts("pixie", 1, 5).enqueue(new Callback<ProductResponse>() {
            @Override
            public void onResponse(Call<ProductResponse> call, Response<ProductResponse> response) {
                ProductResponse res = response.body();
                Log.d(this.getClass().getName(), "Get the res");
            }

            @Override
            public void onFailure(Call<ProductResponse> call, Throwable t) {

            }
        });

        this.apiaiService = new ApiAiClientService();
        APIAIRequest apiaiRequest = new APIAIRequest();
        apiaiRequest.addQuery("i want to buy car");

        this.apiaiService.getService().query(apiaiRequest).enqueue(new Callback<APIAIResponse>() {
            @Override
            public void onResponse(Call<APIAIResponse> call, Response<APIAIResponse> response) {
                APIAIResponse res = response.body();
                Map<String, Object> map = res.getResult().getParameters();
                Log.d("debug", "debug");
            }

            @Override
            public void onFailure(Call<APIAIResponse> call, Throwable t) {
                Log.d("error", "err");
            }
        });

    }

    /**
     * Set and initialize the view elements.
     */
    private void initializeView() {
        findViewById(R.id.notify_me).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startService(new Intent(MainActivity.this, FloatingViewService.class));
                finish();
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == CODE_DRAW_OVER_OTHER_APP_PERMISSION) {

            //Check if the permission is granted or not.
            if (resultCode == RESULT_OK) {
                initializeView();
            } else { //Permission is not available
                Toast.makeText(this,
                        "Draw over other app permission not available. Closing the application",
                        Toast.LENGTH_SHORT).show();

                finish();
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }
}
