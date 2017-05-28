package info.mejamakan.floatingview;

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

    }

    @ReactMethod
    public void hide() {

    }

    @Override
    public String getName() {
        return "FloatingAndroid";
    }
}