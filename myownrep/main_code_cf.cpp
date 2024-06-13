#include<bits/stdc++.h>
#define ll long long
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>
#define pi 3.141592653589793238
#define min3(a,b,c)((a<b)?((a<c)?a:c):((b<c)?b:c))
#define int long long
#define all(a) (a).begin(),(a).end()
#define pb push_back
#define yes "YES"
#define no "NO"
#define ld long double
#define inf LLONG_MAX-69
#define int long long
#define here "here\n"
#define i32 int
#define ff first
#define ss second
#define endl "\n"
#define sz(a) (int)(a).size()
#define vi vector<int>
#define vvi vector<vector<int>>
#define vpii vector<pair<int,int>>
#define vc vector<char>
#define pii pair<int,int>
#define fr(i,a,b) for(int (i) = (a); i <= (b); (i)++)
#define rf(i,b,a) for(int (i) = (b); i >= (a); (i)--)
#define mii map<int,int>
#define lcm(a,b) a*b/__gcd(a,b)
#define all1(a) (a).begin()+1,(a).end()
#define py {cout<<"YES\n";return;}
#define pn {cout<<"NO\n";return;}
using namespace std;
using namespace __gnu_pbds;
struct custom_hash {
    static uint64_t splitmix64(uint64_t x) {
        // https://xorshift.di.unimi.it/splitmix64.c
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }

    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};
void show(int x){
	cout<<"here"<<x<<endl;
}
int binpow(int a,int b){
	int ans=1;
	while(b){
		if(b&1)ans=(ans*a)%1000000007;
		a=(a*a)%1000000007;
		b>>=1;
	}
	return ans;
}
vi fact(int n){
	vi ans;
	for(int i=1;i*i<=n;i++)if(n%i==0){
		ans.pb(i);
		if(i*i!=n)ans.pb(n/i);
	}
	sort(all(ans));
	return ans;
}
int call(){
	array<int,3> a;
	int k;cin>>a[0]>>a[1]>>a[2]>>k;int totvol=a[1]*a[2]*a[0];
	sort(all(a));int ans=0;
	vi f=fact(k);
	for(int i:f){
		for(int j:f){
			if(k%(i*j)!=0)continue;
			int l = k/(i*j);
			if(i*j*l!=k)continue;
			array<int,3> t={i,j,l};
			sort(all(t));
			bool f=1;
			int y=1;
			fr(i,0,2){
				if(a[i]<t[i]){
					y=0;break;
				}
				y*=(a[i]-t[i]+1);
			}
			//cout<<i<<" "<<j<<" "<<l<<" "<<y<< endl;
			ans=max(ans,y); 
		}
	}
	return ans;
}
signed main(){
	ios_base::sync_with_stdio(0);
    cin.tie(0);
	int t=1;
	cin>>t;
	fr(i,1,t){
		cout<<call()<<endl;
	}
}
//13
//1 2
//1 3
//1 13
//2 5
//3 4
//5 6
//5 7
//5 8
//8 12
//4 9
//4 10
//10 11
