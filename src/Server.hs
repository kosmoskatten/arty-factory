{-# LANGUAGE DeriveGeneric     #-}
{-# LANGUAGE OverloadedStrings #-}
module Main
    ( Artyfact (..)
    , main
    ) where

import Control.Monad (filterM)
import Data.Aeson (ToJSON)
import Data.Text (Text)
import GHC.Generics (Generic)
import Network.Hive
import System.Environment (getArgs)
import System.Directory (getDirectoryContents, doesFileExist)

import qualified Data.Text as T

data Artyfact
    = Artyfact
        { name     :: !Text
        , fullPath :: !Text
        }
    deriving (Generic, Show)

instance ToJSON Artyfact

main :: IO ()
main = do
    [thePort] <- getArgs
    let config = defaultHiveConfig 
                   { port         = read thePort 
                   , loggerStream = ToFile "logs/arty-factory.txt" 
                   }
    hive config $ do
        get `accepts` Anything
            `handledBy` redirectTo "index.html"

        get </> "storage" 
            `accepts` Anything
            `handledBy` do
                files <- liftIO getStorageFiles
                respondJSON $ map toArtyfact files

        defaultRoute `handledBy` serveDirectory "site"

toArtyfact :: FilePath -> Artyfact
toArtyfact file = 
    Artyfact { name     = T.pack file
             , fullPath = T.pack $ storageUrlPrefix `mappend` file 
             }

getStorageFiles :: IO [FilePath]
getStorageFiles =
    filterM existingFile =<< getDirectoryContents storageDir
    where
        existingFile :: FilePath -> IO Bool
        existingFile fp = doesFileExist $ storageDir `mappend` fp

storageUrlPrefix :: FilePath
storageUrlPrefix = "/storage/"

storageDir :: FilePath
storageDir = "site/storage/"
