module Main
    ( main
    ) where

import Network.Hive

main :: IO ()
main =
    hive defaultHiveConfig $ do
        get `accepts` Anything
            `handledBy` respondFile "site/index.html"
        defaultRoute `handledBy` serveDirectory "site"
