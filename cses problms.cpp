//dont see my code u trespasser :(
//khud ka likho bsdk
#include<bits/stdc++.h>
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
#define sz(a) (a).size()
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
#define py cout<<"YES\n"
#define pn cout<<"NO\n"
using namespace std;
vi a;
vvi g;
void show(int x){
	cout<<"here"<<x<<endl;
}
void call(){
	string x,y;cin>>x>>y;
	int n=sz(x),m=sz(y);
	vvi dp(n+1,vi (m+1,0));
	//base cases
	fr(i,0,n){
		dp[i][m] = n-i;
	}
	fr(i,0,m){
		dp[n][i] = m-i;
	}
	rf(i,n-1,0){
		rf(j,m-1,0){
			if(x[i]==y[j])dp[i][j]=dp[i+1][j+1];
			else{
				dp[i][j]=min3(dp[i][j+1],dp[i+1][j],dp[i+1][j+1])+1;
			}
		}
	}
	cout<<dp[0][0]<<endl;
}
signed main(){
	ios::sync_with_stdio(0);
    cin.tie(0);
	int t=1;//cin>>t;
	while(t--){
		call();
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
//ez ww
