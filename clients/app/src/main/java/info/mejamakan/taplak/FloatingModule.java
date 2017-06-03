package info.mejamakan.taplak;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class FloatingModule extends ReactContextBaseJavaModule {
    public static ReactContext mReactContext;

    public FloatingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @ReactMethod
    public void show() {
        Intent broadcastIntent = new Intent();
        broadcastIntent.setAction("com.mejamakan.taplak.SHOW_BOX");
        if (mReactContext != null) {
            mReactContext.sendBroadcast(broadcastIntent);
        } else {
            Log.d("TEST", "React Context is not initialized");
        }
    }

    @ReactMethod
    public void hide() {

    }

    @Override
    public String getName() {
        return "FloatingAndroid";
    }
}