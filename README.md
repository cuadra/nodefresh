# AEM Node Validator
Prepares AEM node path lists for replication by normalizing paths and removing invalid entries.

Basically fixes dev lists for AEM release managers.

## Rules
- ....html > /jcr:content
- config.html#/ > config/jcr:content/sling:configs/
- 'Instructions or comments' > [removed]
