function FindProxyForURL(url, host) {

if (isInNet(host, "63.241.250.0", "255.255.255.0"))
	return "PROXY 173.82.245.100:3220";

if (shExpMatch(host, "*.clevercloudedu.com") ||
    shExpMatch(host, "*.brainpop.com") ||
    shExpMatch(host, "*.scholastic.com") ||
    shExpMatch(host, "*.cloudfront.net") ||
    shExpMatch(host, "*.brightcove.com") ||
    shExpMatch(host, "*.headsprout.com") ||
    shExpMatch(host, "*.learnwithhomer.com") ||
    shExpMatch(host, "*.getepic.com") ||
    shExpMatch(host, "*.gymboree.com") ||
    shExpMatch(host, "*.renlearn.com") ||
    shExpMatch(host, "*.readingeggs.com") ||
    shExpMatch(host, "*.ipip.net") ||
    shExpMatch(host, "*.readingeggsassets.com") ||
	  shExpMatch(host, "*.starfall.com"))
        return "PROXY 173.82.245.100:3220";
        
// If the hostname matches, send direct.
    if (shExpMatch(host, "(*.raz-kids.com)") ||
	shExpMatch(host, "(*.kidsa-z.com)"))
        return "PROXY 173.82.245.100:3220";
    if (shExpMatch(host, "(*.mathletics.com)") ||
        shExpMatch(host, "(*.cloudapp.net)"))
        return "PROXY 173.82.245.100:3220";
    return "DIRECT";
 
}
