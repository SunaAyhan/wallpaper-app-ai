package com.suna.sunayumi;

import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
public class MainActivity extends BridgeActivity {
    @Override
    public void onBackPressed() {
        WebView webView = getBridge().getWebView();

        webView.loadUrl("javascript:pressBack()");

        // in Index.html create tag
        //<script type="text/javascript">
        //   function  pressBack(){
        //      alert('yes!!')
        //   } 
        //</script>

        return;
    }
}
