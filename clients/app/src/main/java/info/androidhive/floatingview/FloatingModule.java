package info.androidhive.floatingview;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

public class FloatingModule extends ReactContextBaseJavaModule {
    public static ReactContext mReactContext;

    public FloatingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @ReactMethod
    public void show() {

    }

    @ReactMethod
    public void hide() {

    }

    @Override
    public String getName() {
        return "FloatingAndroid";
    }
}