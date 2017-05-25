package info.androidhive.floatingview.model;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;

import info.androidhive.floatingview.R;

public class ProductAdapter extends RecyclerView.Adapter<ProductAdapter.MyViewHolder> {

    public class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView titleTextView;
        public ImageView likeImageView;

        public MyViewHolder(View v) {
            super(v);
            titleTextView = (TextView) v.findViewById(R.id.titleTextView);
            likeImageView = (ImageView) v.findViewById(R.id.likeImageView);
        }
    }

    private ArrayList<Product> list;

    public ProductAdapter(ArrayList<Product> Data) {
        list = Data;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent,int viewType) {
        // create a new view
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.product_card, parent, false);
        MyViewHolder holder = new MyViewHolder(view);
        return holder;
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, int position) {
        holder.titleTextView.setText(list.get(position).getName());
        holder.likeImageView.setTag(R.drawable.ic_like);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }
}