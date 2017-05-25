package info.androidhive.floatingview;

import android.app.Activity;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.IBinder;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.ArrayList;

import static android.R.id.message;
import static android.content.ContentValues.TAG;


public class FloatingViewService extends Service {

    private WindowManager mWindowManager;
    private View mFloatingView;

    RecyclerView myRecyclerView;

    private Intent intent;
    private RelativeLayout mCollapseView;
    public static Context context;

    public FloatingViewService() {
    }

    public static void hideBalloon() {
        Log.d("TEST", "HIDE BALLOON");
        //        //The root element of the collapsed view layout
//        final View collapsedView = mFloatingView.findViewById(R.id.collapse_view);

//        View collapsedView = mFloatingView.findViewById(R.id.collapse_view);
//        collapsedView.getLayoutParams().height = 800;
//        collapsedView.getLayoutParams().width = 800;
//        collapsedView.requestLayout();
//        collapsedView.setLayoutParams(new RelativeLayout.LayoutParams(300,300));
    }

    public static void showBalloon() {
        Log.d("TEST", "SHOW BALLOON");
        //        //The root element of the collapsed view layout
//        final View collapsedView = mFloatingView.findViewById(R.id.collapse_view);
//        View mFloatingView = LayoutInflater.from(context).inflate(R.layout.layout_floating_widget, null);
//        View collapsedView = mFloatingView.findViewById(R.id.collapse_view);
//        collapsedView.getLayoutParams().height = 100;
//        collapsedView.getLayoutParams().width = 100;
//        collapsedView.requestLayout();
//        collapsedView.setLayoutParams(new RelativeLayout.LayoutParams(100,100));
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
        public void onCreate() {
        super.onCreate();
        context = this;

        //Inflate the floating view layout we created
        mFloatingView = LayoutInflater.from(this).inflate(R.layout.layout_floating_widget, null);
//        mFloatingView = LayoutInflater.from(this).inflate((RelativeLayout)MyReactActivity.mReactRootView, null);

        //Add the view to the window.
        final WindowManager.LayoutParams params = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.TYPE_PHONE,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
            PixelFormat.TRANSLUCENT);
        //Specify the view position
        params.gravity = Gravity.TOP | Gravity.LEFT;        //Initially view will be added to top-left corner
        params.x = 0;
        params.y = 100;

        mCollapseView = (RelativeLayout) mFloatingView.findViewById(R.id.collapse_view);
        mCollapseView.addView(MyReactActivity.mReactRootView);

        //Add the view to the window
        mWindowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        mWindowManager.addView(mFloatingView, params);
//        mWindowManager.addView(MyReactActivity.mReactRootView, params);

//        collapsedView = mFloatingView.findViewById(R.id.collapse_view);
//
//        this.hideBalloon();


//        //Drag and move floating view using user's touch action.
//        mFloatingView.findViewById(R.id.root_container).setOnTouchListener(new View.OnTouchListener() {
//            private int initialX;
//            private int initialY;
//            private float initialTouchX;
//            private float initialTouchY;
//
//            @Override
//            public boolean onTouch(View v, MotionEvent event) {
//                switch (event.getAction()) {
//                    case MotionEvent.ACTION_DOWN:
//
//                        //remember the initial position.
//                        initialX = params.x;
//                        initialY = params.y;
//
//                        //get the touch location
//                        initialTouchX = event.getRawX();
//                        initialTouchY = event.getRawY();
//                        return true;
//                    case MotionEvent.ACTION_UP:
//                        int Xdiff = (int) (event.getRawX() - initialTouchX);
//                        int Ydiff = (int) (event.getRawY() - initialTouchY);
//
//                        //The check for Xdiff <10 && YDiff< 10 because sometime elements moves a little while clicking.
//                        //So that is click event.
//                        if (Xdiff < 10 && Ydiff < 10) {
//                            if (isViewCollapsed()) {
//                                //When user clicks on the image view of the collapsed layout,
//                                //visibility of the collapsed layout will be changed to "View.GONE"
//                                //and expanded view will become visible.
//                                collapsedView.setVisibility(View.GONE);
//                                expandedView.setVisibility(View.VISIBLE);
//                            }
//                        }
//                        return true;
//                    case MotionEvent.ACTION_MOVE:
//                        //Calculate the X and Y coordinates of the view.
//                        params.x = initialX + (int) (event.getRawX() - initialTouchX);
//                        params.y = initialY + (int) (event.getRawY() - initialTouchY);
//
//                        //Update the layout with new X & Y coordinate
//                        mWindowManager.updateViewLayout(mFloatingView, params);
//                        return true;
//                }
//                return false;
//            }
//        });


    }

    /**
     * Detect if the floating view is collapsed or expanded.
     *
     * @return true if the floating view is collapsed.
     */
    private boolean isViewCollapsed() {
        return mFloatingView == null || mFloatingView.findViewById(R.id.collapse_view).getVisibility() == View.VISIBLE;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mFloatingView != null) mWindowManager.removeView(mFloatingView);
    }
}
